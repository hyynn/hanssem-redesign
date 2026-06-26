// 패밀리 코드(상품코드 앞 9자리) → 이미지 폴더명 매핑.
// 새 패밀리 추가 시 아래 import 한 줄 + FAMILY_REGISTRY 항목 한 줄씩만 추가.
import { FAMILY_CODE as MONO_BED_CODE, FAMILY_PATH as MONO_BED_PATH } from "./bedroom/bed/101012001";
import { FAMILY_CODE as MONO_DRESSER_CODE, FAMILY_PATH as MONO_DRESSER_PATH } from "./bedroom/dresser/101210001";
import { FAMILY_CODE as MONO_CHEST_CODE, FAMILY_PATH as MONO_CHEST_PATH } from "./bedroom/dresser/101210002";
import { FAMILY_CODE as EURO_NIGHTSTAND_CODE, FAMILY_PATH as EURO_NIGHTSTAND_PATH } from "./bedroom/dresser/101212001";
import { FAMILY_CODE as MOA_SOFA_CODE, FAMILY_PATH as MOA_SOFA_PATH } from "./livingroom/sofa/111012001";

export const FAMILY_REGISTRY: Record<string, string> = {
  [MONO_BED_CODE]: MONO_BED_PATH,
  [MONO_DRESSER_CODE]: MONO_DRESSER_PATH,
  [MONO_CHEST_CODE]: MONO_CHEST_PATH,
  [EURO_NIGHTSTAND_CODE]: EURO_NIGHTSTAND_PATH,
  [MOA_SOFA_CODE]: MOA_SOFA_PATH,
};

export function getFamilyFolder(productId: string): string {
  const familyCode = productId.slice(0, 9);
  const folder = FAMILY_REGISTRY[familyCode];
  if (!folder) throw new Error(`No family folder registered for: ${productId}`);
  return folder;
}
