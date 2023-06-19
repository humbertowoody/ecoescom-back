import { Controller, Get } from '@nestjs/common';
import { AppService, Information } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Generic')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns information about the API',
    type: Information,
  })
  @ApiOperation({
    summary: 'Returns information about the API',
    description: 'Returns basic information about the API',
  })
  getInformation() {
    return this.appService.getInformation();
  }
}
