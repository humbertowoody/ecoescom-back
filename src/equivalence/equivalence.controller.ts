import { Controller } from '@nestjs/common';
import { EquivalenceService } from './equivalence.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { EquivalenceEntity } from './entities/equivalence.entity';

@ApiTags('Equivalences')
@Crud({
  model: {
    type: EquivalenceEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('equivalences')
export class EquivalenceController
  implements CrudController<EquivalenceEntity>
{
  constructor(public service: EquivalenceService) {}
}
