/* --------------------------------------------------------------------------------- */
/*                                                                                   */
/* --------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------
    Sensore di portata del liquido - DIYhacking.com Arvind Sanjeev
    Misura la portata del liquido/acqua utilizzando questo codice
    collega Vcc e Gnd del sensore all'Arduino e il filo del segnale
    al pin digitale 3 di Arduino 
   --------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------
    * Pin del LED di stato
    * Pin dell'interrupt del sensore
    * Pin del sensore di flusso
    * Velocità di trasmissione seriale
   --------------------------------------------------------------------------------- */

#define     STATUSLED           = 13;
#define     SENSORINTERRUPT     = 3;
#define     SENSORPIN           = 3;
#define     BAUDRATE            = 9600;
#define     CALIBRATIONFACTOR   = 5.1;

/* ---------------------------------------------------------------------------------
    Il sensore di flusso a effetto Hall genera circa 4,5 impulsi al secondo
    per ogni litro/minuto di flusso
   --------------------------------------------------------------------------------- */

float               calibrationFactor = CALIBRATIONFACTOR;
float               flowRate;
volatile byte       pulseCount;
unsigned int        flowMilliLitres;
unsigned long       totalMilliLitres;
unsigned long       oldTime;

/* --------------------------------------------------------------------------------- */
/*                                 Setup                                             */
/* --------------------------------------------------------------------------------- */

void setup()
{
    Serial.begin(BAUDRATE);

    /* -----------------------------------------------------------------------------
        * Imposta il LED di stato come output
        * LED attivo basso

        * Imposta il pin del sensore come input
        * Abilita il pull-up interno per il pin del sensore    
       ----------------------------------------------------------------------------- */

    pinMode         ( STATUSLED, OUTPUT );
    pinMode         ( SENSORPIN, INPUT );

    digitalWrite    ( STATUSLED, HIGH );
    digitalWrite    ( SENSORPIN, HIGH );

    flowRate              = 0.0;
    pulseCount            = 0;
    flowMilliLitres       = 0;
    totalMilliLitres      = 0;
    oldTime               = 0;

    /* -----------------------------------------------------------------------------
        Il sensore a effetto Hall è collegato al pin 2, 
        che utilizza l'interrupt 0
        Configurato per attivarsi su un cambiamento di stato FALLING
       ----------------------------------------------------------------------------- */
}

/* --------------------------------------------------------------------------------- */
/*                                  loop                                             */
/* --------------------------------------------------------------------------------- */

void loop() 
{ 
    flowMeter(); 
}

void flowMeter()
{
    if ( (millis() - oldTime) > 100 )
    {  
        /* -------------------------------------------------------------------------
            * Disabilita l'interrupt per evitare conflitti durante il calcolo
           ------------------------------------------------------------------------- */

        detachInterrupt(SENSORINTERRUPT);       

        /* -------------------------------------------------------------------------
            Poiché questo ciclo potrebbe non completarsi in intervalli di 1 secondo
            calcoliamo il numero di millisecondi trascorsi dall'ultima esecuzione
            e lo usiamo per scalare l'output. 
            Applichiamo anche il calibrationFactor per adattare l'output
            in base al numero di impulsi per secondo per unità di misura
           ------------------------------------------------------------------------- */

        /* -------------------------------------------------------------------------
            * Calcola la portata in litri/minuto
            * Riabilita l'interrupt per contare gli impulsi successivi
            * Memorizza il momento in cui è stato eseguito questo calcolo              
           ------------------------------------------------------------------------- */

        flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;
        attachInterrupt(SENSORINTERRUPT, pulseCounter, FALLING);
        oldTime = millis();        

        /* -------------------------------------------------------------------------
            Divide la portata in litri/minuto per 60 per determinare quanti litri
            sono passati attraverso il sensore in questo intervallo di 1 secondo, 
            quindi moltiplica per 1000 per convertire in millilitri
           ------------------------------------------------------------------------- */

        /* -------------------------------------------------------------------------
            * Diviso per 600 per 1/10 di secondo
            * Aggiunge i millilitri passati in questo secondo al totale cumulativo        
           ------------------------------------------------------------------------- */
        
        flowMilliLitres     =   (flowRate / 600) * 1000;
        totalMilliLitres    +=  flowMilliLitres;

        Serial.print    (flowRate);
        Serial.print    ("\t");
        Serial.print    ("Quantità di liquido erogata: ");
        Serial.print    (totalMilliLitres);

        Serial.println  (" mL");
        Serial.println  ("\t");

        /* -------------------------------------------------------------------------
            * Resetta il contatore degli impulsi per il prossimo ciclo
            * Riabilita l'interrupt per il conteggio degli impulsi        
           ------------------------------------------------------------------------- */

        pulseCount = 0;
        attachInterrupt(SENSORINTERRUPT, pulseCounter, FALLING);
    }
}

/* --------------------------------------------------------------------------------- */
/*                                functions                                          */
/* --------------------------------------------------------------------------------- */

void pulseCounter() 
{ 
    pulseCount++; 
}

/* --------------------------------------------------------------------------------- */
/*                                                                                   */
/* --------------------------------------------------------------------------------- */
