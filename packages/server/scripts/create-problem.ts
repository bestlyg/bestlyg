/**
 * @typedef {import("../dist/types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("../dist/types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import axios from 'axios';
import { problem as problemFromCreate } from './problem';
import { getDirNameFromProblemName, getTitleSlugFromURL, DATE_FORMAT_SOLUTION } from '../external';
import { getProblem, createRequest, createSolution, createProblem, updateProblem, getProblemWithSlug } from './utils';

function descFormat(str: string) {
    return str.endsWith('。') ? str : str + '。';
}

async function main() {
    const request = await createRequest();

    let problem = problemFromCreate;

    problem.name = problem.name!.replace(/ /g, '');
    const dirName = getDirNameFromProblemName(problem.name);
    // const filePath = resolve(PATH_DATA, dirName, problem.name + '.json');

    const titleSlug = getTitleSlugFromURL(problem.url!);
    const problemResult = await getProblemWithSlug(request, titleSlug);
    console.log('problemResult', problemResult);
    problem.id = problemResult.questionId;
    problem.name = (problemResult.questionFrontendId + '.' + problemResult.translatedTitle).replace(
        / /g,
        '',
    );
    problem.level = problemResult.difficulty;
    problem.tags = problemResult.topicTags.map(v => v.translatedName);

    problem.solutions.forEach(s => {
        s.date = best.dayjs(s.date).format(DATE_FORMAT_SOLUTION);
    });

    if (problem.exist) {
        const existProblem = await getProblem(request, problem.name);
        console.log('problem', existProblem);
        const id = existProblem.id;
        await createSolution(
            request,
            problem.solutions.map(({ script, time, memory, desc, code, date }) => ({
                script: script!,
                time: time!,
                memory: memory!,
                desc: desc!,
                code: code!,
                date: new Date(date!),
                problem: { id },
            })),
        );
        Reflect.deleteProperty(problem, 'solutions');
        Reflect.deleteProperty(problem, 'exist');
        Reflect.deleteProperty(problem, 'tags');
        Reflect.deleteProperty(problem, 'id');
        await updateProblem(request, existProblem.id, problem);
    } else {
        problem.desc = descFormat(problem.desc ?? '');

        Reflect.deleteProperty(problem, 'exist');

        await createProblem(request, [
            {
                name: problem.name,
                url: problem.url,
                desc: problem.desc,
                tags: problem.tags,
                level: problem.level,
                solutions: problem.solutions.map(({ script, time, memory, desc, code, date }) => ({
                    script,
                    time,
                    memory,
                    desc,
                    code,
                    date: new Date(date!),
                })),
            },
        ]);
    }
}

main().catch(err => {
    console.log(err);
});
