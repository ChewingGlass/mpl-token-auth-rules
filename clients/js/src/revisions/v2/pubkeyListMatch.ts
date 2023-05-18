import {
  Context,
  PublicKeyBase58,
  PublicKeyInput,
  Serializer,
  base58,
  base58PublicKey,
} from '@metaplex-foundation/umi';
import { wrapSerializerInRuleHeaderV2 } from './ruleHeader';
import { RuleTypeV2 } from './ruleType';

export type PubkeyListMatchRuleV2 = {
  type: 'PubkeyListMatch';
  field: string;
  publicKeys: PublicKeyBase58[];
};

export const pubkeyListMatchV2 = (
  field: string,
  publicKeys: PublicKeyInput[]
): PubkeyListMatchRuleV2 => ({
  type: 'PubkeyListMatch',
  field,
  publicKeys: publicKeys.map(base58PublicKey),
});

export const getPubkeyListMatchRuleV2Serializer = (
  context: Pick<Context, 'serializer'>
): Serializer<PubkeyListMatchRuleV2> => {
  const s = context.serializer;
  return wrapSerializerInRuleHeaderV2(
    context,
    RuleTypeV2.PubkeyListMatch,
    s.struct([
      ['field', s.string({ size: 32 })],
      [
        'publicKeys',
        s.array(s.string({ encoding: base58, size: 32 }), {
          size: 'remainder', // TODO: Ensure this works.
        }),
      ],
    ])
  );
};