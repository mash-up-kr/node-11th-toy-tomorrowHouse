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
import { Workspace } from 'src/entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
@ApiTags('Workspace API')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Find Workspace API',
    description: 'Find Workspace by id',
  })
  @ApiCreatedResponse({ description: 'Find Workspace by id', type: Workspace })
  getWorkspaceById(@Param('id') id: number) {
    return this.workspaceService.getWorkspaceById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Find Workspaces API',
    description: 'Find Workspaces',
  })
  @ApiCreatedResponse({ description: 'Find Workspaces' })
  getWorkspaces() {
    return this.workspaceService.getWorkspaces();
  }

  @Post()
  @ApiOperation({
    summary: 'Create Workspace API',
    description: 'Create Workspace',
  })
  @ApiCreatedResponse({ description: 'Create Workspace', type: Workspace })
  create(@Body() createWorkspaceData: CreateWorkspaceDto) {
    return this.workspaceService.createWorkspace(
      createWorkspaceData.name,
      createWorkspaceData.userIDs,
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update Workspace API',
    description: 'Update Workspace name',
  })
  @ApiCreatedResponse({ description: 'Update Workspace name', type: Workspace })
  updateWorkspaceName(
    @Param('id') workspaceId: number,
    @Body() updateWorkspaceData: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.updateWorkspaceNameById(
      workspaceId,
      updateWorkspaceData.name,
    );
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete Workspace API',
    description: 'Delete Workspace by id',
  })
  @ApiCreatedResponse({ description: 'Delete Workspace by id', type: 'void' })
  deleteWorkspaceById(@Param('id') id: number) {
    return this.workspaceService.deleteWorkspaceById(id);
  }
}
