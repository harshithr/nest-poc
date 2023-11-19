import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";

export class AuthGuard implements CanActivate {
  constructor(@InjectRepository(User) private repo: Repository<User>) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) return false;

    return this.authorizationCheck(authorization);

  }

  async authorizationCheck(token: string) {
    const authMatch = await this.repo.findOne({ select: {id: true}, where: { token }})

    console.log({authMatch});
    

    if (!authMatch) return false;

    return true;
  }
}