import {
  CHARACTER_TARGETS,
  type CharacterTarget,
} from "../../consts/characters/character-target.consts";
import { getBazziImages } from "./_characters/bazzi/get-bazzi-images";
import { getDaoImages } from "./_characters/dao/get-dao-images";
import { getDizniImages } from "./_characters/dizni/get-dizni-images";
import { getEddiImages } from "./_characters/eddi/get-eddi-images";
import { getKepiImages } from "./_characters/kepi/get-kepi-images";
import { getMaridImages } from "./_characters/marid/get-marid-images";
import { getMosImages } from "./_characters/mos/get-mos-images";
import { getUniImages } from "./_characters/uni/get-uni-images";

export function getCharacterImages(props: { target: CharacterTarget }) {
  const { target } = props;

  switch (target) {
    case CHARACTER_TARGETS.DAO: {
      return getDaoImages();
    }
    case CHARACTER_TARGETS.BAZZI: {
      return getBazziImages();
    }
    case CHARACTER_TARGETS.DIZNI: {
      return getDizniImages();
    }
    case CHARACTER_TARGETS.EDDI: {
      return getEddiImages();
    }
    case CHARACTER_TARGETS.KEPI: {
      return getKepiImages();
    }
    case CHARACTER_TARGETS.MARID: {
      return getMaridImages();
    }
    case CHARACTER_TARGETS.MOS: {
      return getMosImages();
    }
    case CHARACTER_TARGETS.UNI: {
      return getUniImages();
    }
  }
}
