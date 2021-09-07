import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dm } from 'src/entities/dm.entity';
import { Workspace } from 'src/entities/workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DmService {
  constructor(
    @InjectRepository(Dm)
    private readonly dmRepository: Repository<Dm>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async getDm(dm_id: number): Promise<Dm> {
    return await this.dmRepository.findOne({ id: dm_id });
  }

  async getDms(): Promise<Dm[]> {
    return await this.dmRepository.find();
  }

  async sendDm(
    workspace_id: number,
    user_from_id: number,
    user_to_id: number,
    content: string,
  ): Promise<Dm> {
    const dm = this.dmRepository.create({
      user_from_id,
      user_to_id,
      content,
    });
    const workspace = await this.workspaceRepository.findOne({
      id: workspace_id,
    });

    dm.workspace = workspace;
    return await this.dmRepository.save(dm);
  }

  async updateDmContentById(dm_id: number, content: string): Promise<Dm> {
    const dm = await this.dmRepository.findOne({ id: dm_id });
    dm.content = content;
    return await this.dmRepository.save(dm);
  }

  async deleteDmById(dm_id: number): Promise<void> {
    const dm = await this.dmRepository.findOne({ id: dm_id });
    await this.dmRepository.delete(dm);
  }
}
