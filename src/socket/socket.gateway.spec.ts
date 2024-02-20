import { Test, TestingModule } from '@nestjs/testing';
import { SocketGateway } from './socket.gateway';

describe('SocketGateway', () => {
  let gateway: SocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: SocketGateway,
        useValue: {
          selectRoom: jest.fn(),
          handleMessage: jest.fn(),
          handlePrivateMessage: jest.fn(),
          afterInit: jest.fn(),
          handleConnection: jest.fn(),
          handleDisconnect: jest.fn()
        }
      }],
    }).compile();

    gateway = module.get<SocketGateway>(SocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
