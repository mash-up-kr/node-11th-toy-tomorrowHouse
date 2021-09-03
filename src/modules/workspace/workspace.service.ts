import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Workspace } from 'src/entities/workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getWorkspaceById(id: number): Promise<Workspace> {
    return await this.workspaceRepository.findOne({ id: id });
  }

  async getWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.find();
  }

  async createWorkspace(name: string, userIDs: number[]): Promise<Workspace> {
    const workspace = new Workspace();
    workspace.name = name;
    workspace.users = [];
    for (let i = 0; i < userIDs.length; i++) {
      const user = await this.userRepository.findOne(userIDs[i]);
      if (user) {
        workspace.users.push(user);
      }
    }
    return await this.workspaceRepository.save(workspace);
  }

  async updateWorkspaceNameById(id: number, name: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({ id: id });
    workspace.name = name;
    return await this.workspaceRepository.save(workspace);
  }

  async deleteWorkspaceById(id: number): Promise<void> {
    const workspace = await this.workspaceRepository.findOne({ id: id });
    await this.workspaceRepository.delete(workspace);
  }
}
