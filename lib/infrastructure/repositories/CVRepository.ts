// Concrete Repository Implementation
import { ICVRepository } from "@/lib/domain/repositories/ICVRepository";
import { CVData } from "@/lib/domain/models/Profile";
import { cvDataEn } from "../data/cv-data-en";
import { cvDataFa } from "../data/cv-data-fa";

export class CVRepository implements ICVRepository {
  async getCVData(locale: string): Promise<CVData> {
    // Simulate async data fetching
    await new Promise((resolve) => setTimeout(resolve, 0));

    return locale === "fa" ? cvDataFa : cvDataEn;
  }
}
