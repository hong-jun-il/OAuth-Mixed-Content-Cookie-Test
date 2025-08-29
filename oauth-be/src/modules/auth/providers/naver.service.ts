import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverService {
  constructor(private readonly httpService: HttpService) {}
}
