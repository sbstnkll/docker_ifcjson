import {PythonShell} from 'python-shell';
import { promisify } from "util";
import fs from "fs";

/**
 * PythonShell
 */
 export const asyncRunPython = async (fileName, options) => {
	const result = await new Promise((resolve, reject) => {
		PythonShell.run(fileName, options, (err, results) => {
			if (err) return reject(err);
			return resolve(results);
		});
	});
	return result;
};

/**
 * FS
 */
const writeFilePromise = promisify(fs.writeFile)
const readFilePromise = promisify(fs.readFile)
const mkdirPromise = promisify(fs.mkdir);
const rmPromise = promisify(fs.rm);
export const asyncSaveFile = async (fileName, fileBuffer) => {
	try {
		await writeFilePromise(fileName, fileBuffer);
		return "file successfully written";
	} catch {
		return "error while writing file";
	};
};
export const asyncReadFile = async (fileName) => {
	try {
		const result = await readFilePromise(fileName);
		return result;
	} catch (err) {
		return err;
	};
};
export const asyncMkdir = async (dirName) => {
	try {
		await mkdirPromise(dirName);
		return "directory successfully created";
	} catch {
		return "error while creating directory";
	};
};
export const asyncRm = async (dirName) => {
  try {
		await rmPromise(dirName, { recursive: true, force: true });
		return "directory successfully removed";
	} catch (err) {
    console.log(err);
		return "error while removing directory";
	};
}