/* --------------------------------------------------------------------------------- */
/*                                                                                   */
/* --------------------------------------------------------------------------------- */

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

    pinMode         (STATUSLED, OUTPUT);
    pinMode         (SENSORPIN, INPUT);

    digitalWrite    (STATUSLED, HIGH);
    digitalWrite    (SENSORPIN, HIGH);

    flowRate              = 0.0;
    pulseCount            = 0;
    flowMilliLitres       = 0;
    totalMilliLitres      = 0;
    oldTime               = 0;
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
            * Calcola la portata in litri/minuto
            * Riabilita l'interrupt per contare gli impulsi successivi
            * Memorizza il momento in cui è stato eseguito questo calcolo              
           ------------------------------------------------------------------------- */

        flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;
        attachInterrupt(SENSORINTERRUPT, pulseCounter, FALLING);
        oldTime = millis();

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
