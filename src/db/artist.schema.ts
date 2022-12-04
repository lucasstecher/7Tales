import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop([String, { required: true }])
  imageList: string[];

  @Prop({ required: true })
  visitAgain: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
