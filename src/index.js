export default function loader(source) {
    return `${source}\nexport const source = \`${source}\``;
};