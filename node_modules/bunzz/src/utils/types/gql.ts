export type FilePath = string & { __brand?: 'Path' };
export type SourceInfo = { content: string };
export interface ContractSourceCode {
  sources: Record<FilePath, SourceInfo>;
}
