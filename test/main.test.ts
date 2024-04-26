import { cleanup } from './testingHelpers/cleanup';
import './testParts/add.test.part';
import './testParts/get.test.part';
import './testParts/list.test.part';
import './testParts/update.test.part';
import './testParts/validation.test.part';

after(async () => {
    await cleanup();
});