// 패밀리 코드(상품코드 앞 9자리) → 이미지 폴더명 매핑.
// 새 패밀리 추가 시 아래 import 한 줄 + FAMILY_REGISTRY 항목 한 줄씩만 추가.
import { FAMILY_CODE as MONO_BED_CODE, FAMILY_FOLDER as MONO_BED_FOLDER } from "./mono-bed";

export const FAMILY_REGISTRY: Record<string, string> = {
  [MONO_BED_CODE]: MONO_BED_FOLDER,
};

export function getFamilyFolder(productId: string): string {
  const familyCode = productId.slice(0, 9);
  const folder = FAMILY_REGISTRY[familyCode];
  if (!folder) throw new Error(`No family folder registered for: ${productId}`);
  return folder;
}
