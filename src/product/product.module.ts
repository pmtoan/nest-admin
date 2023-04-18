import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { UploadController } from "./upload.controller";
@Module({
  imports: [TypeOrmModule.forFeature([Product]), CommonModule, AuthModule],
  providers: [ProductService],
  controllers: [ProductController, UploadController],
})
export class ProductModule {}
