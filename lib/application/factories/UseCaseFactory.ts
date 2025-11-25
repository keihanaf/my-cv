// Factory Pattern - Creating use cases with dependencies
import { GetCVDataUseCase } from "../usecases/GetCVDataUseCase";
import { CVRepository } from "@/lib/infrastructure/repositories/CVRepository";

export class UseCaseFactory {
  private static cvRepository = new CVRepository();

  static createGetCVDataUseCase(): GetCVDataUseCase {
    return new GetCVDataUseCase(this.cvRepository);
  }
}
