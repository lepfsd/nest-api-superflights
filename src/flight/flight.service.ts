import { HttpStatus, Injectable } from '@nestjs/common';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FLIGHT } from 'src/common/models/models';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFly = new this.model(flightDTO);
    return await newFly.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id);
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    const flight = { ...flightDTO };
    return await this.model.findByIdAndUpdate(id, flight, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async addPassanger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
