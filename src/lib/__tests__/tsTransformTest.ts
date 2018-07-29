import {readFile} from './utils'
import {
  tsTransform
} from '../tsTrasform';

describe('tsTransform', () => {
  xdescribe('retun appropriate Json', () => {
    const expected = readFile('./src/lib/__tests__/expected/tsexport.json');
    xit('returns empty array', () => {
      // global.exportsをMockにしないとテストができない。
      let result = tsTransform(`${__dirname}/fixtures/tsexport/index`)
      expect(result).toEqual(JSON.parse(expected));
    });
  });
});