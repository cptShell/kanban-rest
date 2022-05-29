import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User as UserEntity } from '../users/users.entity';
import { User } from './user.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

import signin from './schema/controller.signin';
import signup from './schema/controller.signup';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @ApiOperation({ summary: 'Load authenticated user' })
  @ApiBearerAuth('token')
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get('/authenticated-user')
  loadCurrentUser(@User() user: UserEntity) {
    return this.usersService.getById(user.id);
  }

  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({
    status: 201,
    schema: signin,
  })
  @Post('/signin')
  signin(@Body() signinDto: SigninUserDto) {
    return this.authService.signin(signinDto);
  }

  @ApiOperation({ summary: 'Sign up to create an account' })
  @ApiResponse({
    status: 200,
    schema: signup,
  })
  @Post('/signup')
  signup(@Body() signupDto: CreateUserDto) {
    return this.usersService.create(signupDto);
  }
}
