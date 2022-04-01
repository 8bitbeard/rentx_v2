import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("specifications")
class Specification {
  @PrimaryColumn({ type: "uuid", unique: true })
  @Generated("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Specification };
