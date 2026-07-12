import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MonitorSmartphoneIcon } from 'lucide-react'
import { Dropzone } from './Dropzone'
import { BrowseButtons } from './BrowseButtons'
import { AppAlertDialog } from '../AppAlertDialog'
import { FileCopyProgressDialog } from '../common/FileCopyProgressDialog'
import { useDragDrop } from '../../hooks/useDragDrop'
import { useTranslation } from '../../i18n/react-i18next-compat'
import { IS_DESKTOP } from '@/lib/platform'
import { buttonVariants } from '../ui/button'

interface DragDropProps {
	onFileSelect: (path: string, pathType?: 'file' | 'directory') => Promise<void>
	onFilesSelect: (
		paths: string[],
		pathType?: 'file' | 'directory'
	) => Promise<void>
	onRemoveSelectedPath: (path: string) => void
	selectedPaths: string[]
	selectedPath?: string | null
	isLoading?: boolean
	onClearSelection: () => void
}

export function DragDrop({
	onFileSelect,
	onFilesSelect,
	onRemoveSelectedPath,
	selectedPaths,
	selectedPath,
	isLoading,
	onClearSelection,
}: DragDropProps) {
	const { t } = useTranslation()
	const {
		isDragActive,
		pathType,
		showFullPath,
		alertDialog,
		isCopying,
		copyProgress,
		copyFileName,
		copyTotalBytes,
		cancelCopy,
		toggleFullPath,
		browseFile,
		addMoreFiles,
		addMoreFolders,
		browseFolder,
		closeAlert,
		checkPathType,
		dropzoneDragProps,
	} = useDragDrop(onFileSelect, onFilesSelect)

	useEffect(() => {
		if (selectedPath) {
			checkPathType(selectedPath)
		}
	}, [selectedPath, checkPathType])

	return (
		<div className="h-full flex flex-col justify-between">
			<Dropzone
				isDragActive={isDragActive}
				selectedPaths={selectedPaths}
				selectedPath={selectedPath || null}
				pathType={pathType}
				showFullPath={showFullPath}
				isLoading={isLoading || false}
				onToggleFullPath={toggleFullPath}
				onAddFiles={addMoreFiles}
				onAddFolders={addMoreFolders}
				onRemoveSelectedPath={onRemoveSelectedPath}
				onClearSelection={onClearSelection}
				dropzoneDragProps={dropzoneDragProps}
			/>

			{!selectedPath && (
				<div className="flex flex-col items-center gap-3 mt-2 sm:mt-0">
					<BrowseButtons
						isLoading={isLoading || false}
						onBrowseFile={browseFile}
						onBrowseFolder={browseFolder}
					/>
					{IS_DESKTOP && (
						<Link
							to="/settings/devices"
							className={buttonVariants({ variant: 'outline', size: 'sm' })}
						>
							<MonitorSmartphoneIcon />
							{t('common:sender.pairDevice')}
						</Link>
					)}
				</div>
			)}

			<AppAlertDialog
				isOpen={alertDialog.isOpen}
				title={alertDialog.title}
				description={alertDialog.description}
				type={alertDialog.type}
				onClose={closeAlert}
			/>

			<FileCopyProgressDialog
				open={isCopying}
				fileName={copyFileName}
				progress={copyProgress}
				totalBytes={copyTotalBytes}
				onCancel={cancelCopy}
			/>
		</div>
	)
}
