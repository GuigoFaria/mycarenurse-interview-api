import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

describe('AddressesService', () => {
  let service: AddressesService;
  let repository: Repository<Address>;

  const mockAddressRepository = {
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    it('should remove an address by id', async () => {
      const id = 1;
      const result = { affected: 1 };
      jest.spyOn(repository, 'delete').mockResolvedValue(result as any);

      expect(await service.remove(id)).toEqual(result);
      expect(repository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
