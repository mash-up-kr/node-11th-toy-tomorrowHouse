import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Dm } from 'src/entities/dm.entity';
import { DmService } from './dm.service';
import { SendDmDto } from './dto/send-dm.dto';
import { UpdateDmDto } from './dto/update-dm.dto';

@Controller('dm')
@ApiTags('DM API')
export class DmController {
  constructor(private readonly dmService: DmService) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Get DM',
    description: 'Get DM by id',
  })
  @ApiCreatedResponse({
    description: 'Get DM by id',
    type: Dm,
  })
  getDm(@Param('id') dm_id: number) {
    return this.dmService.getDm(dm_id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get DMs',
    description: 'Get DMs',
  })
  @ApiCreatedResponse({
    description: 'Get DMs',
  })
  getDms() {
    return this.dmService.getDms();
  }

  @Post('/:id')
  @ApiOperation({
    summary: 'Send DM',
    description: 'Send DM to another user',
  })
  @ApiCreatedResponse({
    description: 'Send DM to another user',
    type: Dm,
  })
  sendDm(@Param('id') workspace_id: number, @Body() sendDmData: SendDmDto) {
    return this.dmService.sendDm(
      workspace_id,
      sendDmData.user_from_id,
      sendDmData.user_to_id,
      sendDmData.content,
      sendDmData.send_time,
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update Dm',
    description: 'Update Dm content by id',
  })
  @ApiCreatedResponse({
    description: 'Update Dm content by id',
    type: Dm,
  })
  updateDmContentById(
    @Param('id') dm_id: number,
    @Body() updateDmData: UpdateDmDto,
  ) {
    return this.dmService.updateDmContentById(dm_id, updateDmData.content);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete Dm',
    description: 'Delete Dm by id',
  })
  @ApiCreatedResponse({
    description: 'Delete Dm by id',
    type: 'void',
  })
  deleteDmById(@Param('id') dm_id: number) {
    return this.dmService.deleteDmById(dm_id);
  }
}
