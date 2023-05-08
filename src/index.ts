import Field from './field';
import { regex } from './regex';
import Button from './button';
import useVerify from './verify';

export interface depsProps {
    state?: any;
    regex?: RegExp;
}

export { Field, regex, Button, useVerify };
