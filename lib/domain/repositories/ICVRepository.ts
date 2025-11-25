// Repository Interface - Following Dependency Inversion Principle
import { CVData } from "../models/Profile";

export interface ICVRepository {
  getCVData(locale: string): Promise<CVData>;
}
