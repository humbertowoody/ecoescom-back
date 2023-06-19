import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { format } from 'date-fns';

export class Information {
  @ApiProperty({
    example: 'ecoescom-api',
    description: 'Name of the API',
  })
  name: string;

  @ApiProperty({
    example: '1.0.0',
    description: 'Version of the API',
  })
  version: string;

  @ApiProperty({
    example: 'API para el manejo de la información de la plataforma EcoESCOM',
    description: 'Description of the API',
  })
  description: string;

  @ApiProperty({
    example: 'dd/mm/yyyy:HH:mm:ss xx',
    description: 'Date of the request',
  })
  date: string;
}

@Injectable()
export class AppService {
  getInformation(): Information {
    return {
      name: 'ecoescom-api',
      version: '1.0.0',
      description:
        'API para el manejo de la información de la plataforma EcoESCOM',
      date: format(new Date(), 'dd/mm/yyyy:HH:mm:ss xx'),
    };
  }
}
