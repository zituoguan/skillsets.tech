export default function processSkills(data: { skills: string[] }[]) {
    const skillCount: Record<string, number> = {};
    data.forEach((item) => {
        item.skills.forEach((skill: string) => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
    });
    return Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 100)
        .reduce((obj: Record<string, number>, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
}