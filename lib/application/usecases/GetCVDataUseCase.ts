// Use Case - Application Layer
import { ICVRepository } from "@/lib/domain/repositories/ICVRepository";
import { CVData } from "@/lib/domain/models/Profile";

export class GetCVDataUseCase {
  constructor(private repository: ICVRepository) {}

  async execute(locale: string): Promise<CVData> {
    return await this.repository.getCVData(locale);
  }
}
