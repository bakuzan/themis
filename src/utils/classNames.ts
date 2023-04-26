import filterFalsey from './filters/falsey';

type ClassesTypes = string | number | boolean | null | undefined;

export default function classNames(...args: (ClassesTypes | ClassesTypes[])[]) {
  const options = args.reduce<ClassesTypes[]>(
    (p, c) => (c instanceof Array ? [...p, ...c] : [...p, c]),
    [] as ClassesTypes[]
  );

  return options.filter(filterFalsey).join(' ');
}
