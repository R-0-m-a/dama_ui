import {EarringPart} from "./earring-part.model";

export class Earring {
  constructor(public id?: string,
              public name?: string,
              public description?: string,
              public imageUrl?: string,
              public earringDetails?: EarringPart[],
              public priceDetails?: number,
              public premium?: number,
              public deliveryPrice?: number,
              public totalPrice?: number
  ) {
  }
}
