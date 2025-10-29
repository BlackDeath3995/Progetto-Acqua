import { type Flowmeter, type InsertFlowmeter, type FlowmeterReading, type InsertFlowmeterReading } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getFlowmeter(id: string): Promise<Flowmeter | undefined>;
  getAllFlowmeters(): Promise<Flowmeter[]>;
  createFlowmeter(flowmeter: InsertFlowmeter): Promise<Flowmeter>;
  updateFlowmeter(id: string, flowmeter: Partial<InsertFlowmeter>): Promise<Flowmeter | undefined>;
  getFlowmeterReadings(flowmeterId: string, limit?: number): Promise<FlowmeterReading[]>;
  createFlowmeterReading(reading: InsertFlowmeterReading): Promise<FlowmeterReading>;
}

export class MemStorage implements IStorage {
  private flowmeters: Map<string, Flowmeter>;
  private readings: Map<string, FlowmeterReading>;

  constructor() {
    this.flowmeters = new Map();
    this.readings = new Map();
  }

  async getFlowmeter(id: string): Promise<Flowmeter | undefined> {
    return this.flowmeters.get(id);
  }

  async getAllFlowmeters(): Promise<Flowmeter[]> {
    return Array.from(this.flowmeters.values());
  }

  async createFlowmeter(insertFlowmeter: InsertFlowmeter): Promise<Flowmeter> {
    const id = randomUUID();
    const flowmeter: Flowmeter = {
      ...insertFlowmeter,
      id,
      pressure: insertFlowmeter.pressure ?? null,
      temperature: insertFlowmeter.temperature ?? null,
      lastUpdated: new Date(),
    };
    this.flowmeters.set(id, flowmeter);
    return flowmeter;
  }

  async updateFlowmeter(id: string, updates: Partial<InsertFlowmeter>): Promise<Flowmeter | undefined> {
    const flowmeter = this.flowmeters.get(id);
    if (!flowmeter) return undefined;

    const updated: Flowmeter = {
      ...flowmeter,
      ...updates,
      lastUpdated: new Date(),
    };
    this.flowmeters.set(id, updated);
    return updated;
  }

  async getFlowmeterReadings(flowmeterId: string, limit: number = 100): Promise<FlowmeterReading[]> {
    return Array.from(this.readings.values())
      .filter(reading => reading.flowmeterId === flowmeterId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createFlowmeterReading(insertReading: InsertFlowmeterReading): Promise<FlowmeterReading> {
    const id = randomUUID();
    const reading: FlowmeterReading = {
      ...insertReading,
      id,
      pressure: insertReading.pressure ?? null,
      temperature: insertReading.temperature ?? null,
      timestamp: new Date(),
    };
    this.readings.set(id, reading);
    return reading;
  }
}

export const storage = new MemStorage();
