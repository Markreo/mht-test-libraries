import {BaseEntity} from '../../base/_models/base.entity';

export class <%= classify(name) %>Entity extends BaseEntity {
  constructor(entity: Partial<<%= classify(name) %>Entity> = {}) {
    super(entity);
  }
}
