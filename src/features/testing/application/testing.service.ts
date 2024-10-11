import { Injectable } from '@nestjs/common';
import {Pool} from 'pg'
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';


@Injectable()
export class TestingService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    // private readonly pool: Pool,
  ) {
  }

  async deleteAll() {
    // const client = await this.pool.connect();
    try {
      await this.dataSource.query('DROP TABLE users')
      // const result = await client.query('DROP TABLE users')
      // return result.rows
    } finally {
      console.log(1);
      // client.release()
    }
  }

}
