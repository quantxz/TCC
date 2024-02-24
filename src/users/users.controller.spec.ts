import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Response } from "express"
import { sendEmailProducerService } from '../jobs/sendEmail-producer.service';
import { sendMailConsumer } from '../jobs/sendEmail-consumer';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;
  let res: Response;
  
  beforeEach(async () => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UserService,
        useValue: {
          create: jest.fn().mockResolvedValue(UserDto),
          findAll: jest.fn(),
          findOne: jest.fn(),
          findByNickname: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
          FindMany: jest.fn()
        },
        
      }, sendEmailProducerService, sendMailConsumer],
      imports: [
          BullModule.forRoot({
            redis: {
              host: 'localhost',
              port: 6379,
            },
          }),
          MailerModule.forRoot({
            transport: {
              host: process.env.MAIL_HOST,
              port: Number(process.env.MAIL_PORT),
              auth: {
                user: process.env.USER,
                pass: process.env.PASS
              }
            }
          }),
          BullModule.registerQueue({
            name: "mail-Queue"
          })
        ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('teste das rotas de post/patch', () => {
    test("Deve criar um usuário (POST)", async () => {
      const requestBody: UserDto = {
        name:       "Jhosn",
        surname:    "does",
        email:      faker.internet.email(),
        password:   "SenaosAbe@33",
        nickname:   faker.word.noun(10),
      };

      // Executa o método de criação do usuário no controlador
      await controller.create(requestBody, res);


      // Verifica se o método json do Response foi chamado
      expect(res.json).toHaveBeenCalledTimes(1);
      // Exemplo de verificação se a resposta contém uma propriedade 'message'
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Usuário criado' }));
      // Verifica se o status é 201
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Deve retornar os dados do usuario logado (POST-Login)", async () => {
      const requestBody = {
        email:      "canalsemfocod223@gmail.com",
        password:   "Sen@osabe33",
        nickname:   "Quanstxz"
      } as UserDto
      
      await controller.login(requestBody, res);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'retornando dados do usuario achado' }));
      // Verifica se o status é 200
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    describe("Deve retornar os dados do usuario atualizados (PATCH-update)", () => {
      it("testa atualizar o email", async () => {
        const requestBody = {
          surname:      "silva",
          password:   "Sen@osabe33",
          nickname:   "Quanstxz",
          email: "canalsemfocod@gmail.io"
        } as UserDto
        
        await controller.update("email", requestBody, res);
  
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'dados do usuario atualizados' }));
        // Verifica se o status é 200
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("testa atualizar o nickname", async () => {
        const requestBody = {
          surname:      "silva",
          password:   "Sen@osabe33",
          nickname:   "joséalbert",
          email: "canalsemfocod@gmail.com"
        } as UserDto
        
        await controller.update("nickname", requestBody, res);
  
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'dados do usuario atualizados' }));
        // Verifica se o status é 200
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
      });
      
      it("testa atualizar a senha", async () => {
        const requestBody = {
          surname:      "silva",
          nickname:   "Quanstxz",
          email: "canalsemfocod@gmail.com",
          password:   "Senaos@be33"
        } as UserDto
        
        await controller.update("password", requestBody, res);
  
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'dados do usuario atualizados' }));
        // Verifica se o status é 200
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
      });

    });
    
  });

  describe('teste das rotas de delete', () => {
      test("deve retornar que determinado usuario foi excluido", async () => {
        const requestBody: UserDto = {
          name:       "Jhosn",
          surname:    "does",
          email:      faker.internet.email(),
          password:   "SenaosAbe@33",
          nickname:   faker.word.noun(10),
        };
  
        // Executa o método de criação do usuário no controlador
        await controller.remove(requestBody, res);
  
  
        // Verifica se o método json do Response foi chamado
        expect(res.json).toHaveBeenCalledTimes(1);
        // Exemplo de verificação se a resposta contém uma propriedade 'message'
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'usuario deletado' }));
        // Verifica se o status é 201
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
      })
  })

});