/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { createCommentApi } from '@/app/api/createComment'
import { deleteCommentApi } from '@/app/api/deleteComent'
import { editCommentApi } from '@/app/api/editComment'
import { getCommentListApi } from '@/app/api/getCommentList'
import { getPriorityTaskApi } from '@/app/api/getPriorityTask'
import { getStatusTaskApi } from '@/app/api/getStatusTask'
import { getTypeTaskApi } from '@/app/api/getTypeTask'
import { updateDescriptionApi } from '@/app/api/updateDescription'
import { updateEstimateTimeApi } from '@/app/api/updateEstimateTime'
import { updatePriorityApi } from '@/app/api/updatePriority'
import { updateStatusApi } from '@/app/api/updateStatus'
import { updateTimeTrackingApi } from '@/app/api/updateTimeTracking'
import Input from '@/app/component/Input'
import { MemberProject } from '@/app/types/project'
import { CreateTaskProps, UserCommentTask } from '@/app/types/task'
import { useMounted } from '@/lib/hooks/useMounted'
import useUpdateTaskDetail from '@/lib/store/client/flagUpdateTask'
import useUpdateStatusModal from '@/lib/store/client/statusIsShowModal'
import { createTaskSchema } from '@/lib/utils/rules'
import {
	CheckCircleTwoTone,
	ClockCircleOutlined,
	HighlightOutlined,
	MinusCircleOutlined,
	PlusCircleOutlined,
	TagsOutlined
} from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Avatar, Form, Slider, notification } from 'antd'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { Editor } from 'primereact/editor'
import { MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import SelectController from '../SelectController'

interface FormEditTaskProps {
	dataTaskDetail?: CreateTaskProps
	listMemberProject?: MemberProject[]
}

export default function FormEditTask({ dataTaskDetail, listMemberProject }: FormEditTaskProps) {
	const defaultValues: CreateTaskProps = {
		taskId: dataTaskDetail?.taskId,
		taskName: dataTaskDetail?.taskName,
		statusId: dataTaskDetail?.statusId,
		priorityId: dataTaskDetail?.priorityId,
		typeId: dataTaskDetail?.typeId,
		listUserAsign: [],
		timeTrackingSpent: dataTaskDetail?.timeTrackingSpent,
		timeTrackingRemaining: dataTaskDetail?.timeTrackingRemaining,
		originalEstimate: dataTaskDetail?.originalEstimate,
		description: dataTaskDetail?.description
	}

	// check render UI server -> client
	const isClient = useMounted()

	const tokenUser = getCookie('__token') as string

	const { isChange, updateIsChange } = useUpdateTaskDetail()

	const { updateIsEditTask } = useUpdateStatusModal()

	const [descriptionTask, setDescriptionTask] = useState(dataTaskDetail?.description)

	const [selectedMembers, setSelectedMembers] = useState([])

	const [visibleTaskName, setVisibleTaskName] = useState(false)

	const [visibleDescription, setVisibleDescription] = useState(false)

	const [taskName, setTaskName] = useState(dataTaskDetail?.taskName)

	const [taskId, setTaskId] = useState(dataTaskDetail?.taskId)

	const [visibleComment, setVisibleComment] = useState(false)

	const [commentId, setCommentId] = useState(0)

	const [commentUser, setCommentUser] = useState('')

	const [editCommentUser, setEditCommentUser] = useState('')

	const queryClient = useQueryClient()

	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: dataTaskDetail?.timeTrackingSpent,
		timeTrackingRemaining: dataTaskDetail?.timeTrackingRemaining
	})

	// call api status
	const status = useQuery({
		queryKey: ['get-status'],
		queryFn: () => getStatusTaskApi()
	})

	const dataStatusOption = status?.data?.content.map((item: { statusId: number; statusName: string }) => {
		return { value: Number(item.statusId), label: item.statusName }
	})

	// call api priority
	const priority = useQuery({
		queryKey: ['get-priority'],
		queryFn: () => getPriorityTaskApi()
	})

	const dataPriorityOption = priority?.data?.content.map((item: { priorityId: number; priority: string }) => {
		return { value: item.priorityId, label: item.priority }
	})

	// call api type
	const typeTask = useQuery({
		queryKey: ['get-type-task'],
		queryFn: () => getTypeTaskApi()
	})

	const dataTypeOption = typeTask?.data?.content.map((item: { id: number; taskType: string }) => {
		return { value: item.id, label: item.taskType.toLocaleUpperCase() }
	})

	// call api get comment list
	const responseCommentList = useQuery({
		queryKey: ['get-comment-list', taskId],
		queryFn: () => getCommentListApi(taskId)
	})

	// handle change select option
	const handleMemberSelectChange = (selectedOptions: any) => {
		setSelectedMembers(selectedOptions)
	}

	// data option user asign project
	const dataAssignMemberOption: any =
		listMemberProject &&
		listMemberProject?.map((item: MemberProject) => {
			return { value: item.userId, label: item.name }
		})

	const arrayMemberId =
		selectedMembers &&
		selectedMembers?.map((member: { value: number; name: string }) => {
			return member.value
		})

	const {
		register,
		control,
		formState: { errors }
	} = useForm<any>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(createTaskSchema()),
		shouldFocusError: false
	})

	useEffect(() => {
		if (dataTaskDetail) {
			setSelectedMembers(
				dataTaskDetail.assigness?.map((ele: UserCommentTask) => {
					return { value: ele.id, label: ele.name }
				})
			)
			setTaskName(dataTaskDetail?.taskName)
			setDescriptionTask(dataTaskDetail?.description)
			setTaskId(dataTaskDetail?.taskId)
			setTimeTracking({
				timeTrackingRemaining: dataTaskDetail?.timeTrackingRemaining,
				timeTrackingSpent: dataTaskDetail?.timeTrackingSpent
			})
		}
	}, [dataTaskDetail])

	// create comment
	const createCommentMutation = useMutation({
		mutationFn: (data: { taskId: number | string; contentComment: string }) => createCommentApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-comment-list', taskId],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				setCommentUser('')
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleSubmitComment = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		createCommentMutation.mutate({
			taskId: taskId || 0,
			contentComment: commentUser
		})
		setCommentUser('')
	}

	// delete comment
	const deleteCommentMutation = useMutation({
		mutationFn: (commentId: number | string) => deleteCommentApi(commentId, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-comment-list', taskId],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleDeleteComment = (commentId: number | string) => {
		deleteCommentMutation.mutate(commentId)
	}

	// edit comment
	const editCommentMutation = useMutation({
		mutationFn: (data: { id: number | string; contentComment: string }) => editCommentApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-comment-list', taskId],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				setVisibleComment(false)
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleEditComment = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		editCommentMutation.mutate({
			id: commentId,
			contentComment: editCommentUser
		})

		if (!editCommentUser) handleDeleteComment(commentId)
	}

	// update description
	const updateDescriptionMutation = useMutation({
		mutationFn: (data: { taskId: number | string; description: string | undefined }) =>
			updateDescriptionApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-project-detail', dataTaskDetail?.projectId, isChange],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				updateIsChange(!isChange)
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleUpdateDescription = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		updateDescriptionMutation.mutate({
			taskId: taskId || 0,
			description: descriptionTask
		})
		setVisibleDescription(false)
	}

	// update priority
	const updatePriorityMutation = useMutation({
		mutationFn: (data: { taskId: number | string; priorityId: number | undefined }) =>
			updatePriorityApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-project-detail', dataTaskDetail?.projectId, isChange],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				updateIsChange(!isChange)
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleUpdatePriority = (priorityId: number) => {
		updatePriorityMutation.mutate({
			taskId: taskId || 0,
			priorityId: priorityId
		})
	}

	// update status
	const updateStatusMutation = useMutation({
		mutationFn: (data: { taskId: number | string; statusId: number | undefined }) => updateStatusApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-project-detail', dataTaskDetail?.projectId, isChange],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				updateIsChange(!isChange)
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleUpdateStatus = (statusId: number) => {
		updateStatusMutation.mutate({
			taskId: taskId || 0,
			statusId: statusId
		})
	}

	// update estimate time
	const updateEstimateMutation = useMutation({
		mutationFn: (data: { taskId: number | string; originalEstimate: number | undefined }) =>
			updateEstimateTimeApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-project-detail', dataTaskDetail?.projectId, isChange],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				updateIsChange(!isChange)
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleUpdateEstimate = (originalEstimate: number) => {
		updateEstimateMutation.mutate({
			taskId: taskId || 0,
			originalEstimate: originalEstimate
		})
	}

	// update time tracking
	const updateTimeTrackingMutation = useMutation({
		mutationFn: (data: { taskId: number | string; timeTrackingSpent: number; timeTrackingRemaining: number }) =>
			updateTimeTrackingApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				queryClient.invalidateQueries({
					queryKey: ['get-project-detail', dataTaskDetail?.projectId, isChange],
					exact: true
				})
				notification.success({
					message: responseApi?.content
				})
				updateIsChange(!isChange)
			} else {
				notification.error({
					message: responseApi?.response.data.content
				})
			}
		}
	})
	const handleTimeTracking = (data: any) => {
		updateTimeTrackingMutation.mutate({
			taskId: taskId || 0,
			timeTrackingSpent: data.timeTrackingSpent,
			timeTrackingRemaining: data.timeTrackingRemaining
		})
		setTimeTracking({
			timeTrackingSpent: data.timeTrackingSpent,
			timeTrackingRemaining: data.timeTrackingRemaining
		})
	}

	const RenderIconClose = () => {
		return (
			<p title='Close task' className='cursor-pointer absolute md:right-6 md:top-10 z-10 top-3 right-3'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					onClick={() => updateIsEditTask(false)}
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M11.9426 1.25C9.63423 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63423 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25H11.9426ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62178 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.268 3.0449 18.9082 3.23714 19.4075 3.53188L14.75 8.18934V6.25C14.75 5.83579 14.4142 5.5 14 5.5C13.5858 5.5 13.25 5.83579 13.25 6.25V10C13.25 10.4142 13.5858 10.75 14 10.75H17.75C18.1642 10.75 18.5 10.4142 18.5 10C18.5 9.58579 18.1642 9.25 17.75 9.25H15.8107L20.4681 4.59254C20.7629 5.09183 20.9551 5.73199 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62178 21.25 7.91356 21.2484 6.61358 21.0736C5.73199 20.9551 5.09183 20.7629 4.59254 20.4681L9.25 15.8107V17.75C9.25 18.1642 9.58579 18.5 10 18.5C10.4142 18.5 10.75 18.1642 10.75 17.75V14C10.75 13.5858 10.4142 13.25 10 13.25H6.25C5.83579 13.25 5.5 13.5858 5.5 14C5.5 14.4142 5.83579 14.75 6.25 14.75H8.18934L3.53188 19.4075C3.23714 18.9082 3.0449 18.268 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62178 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z'
						fill='#1C274C'
					/>
				</svg>
			</p>
		)
	}

	const RenderTaskName = () => {
		return (
			<>
				{visibleTaskName ? (
					<div className='relative md:col-span-2 pr-[40px]'>
						<Input
							classNameLabel='text-neutral-8'
							nameLabel=''
							isRequired={false}
							required
							name='taskName'
							type='text'
							id='taskName'
							className='relative group  text-neutral-8'
							errorMessage={errors.taskName?.message}
							register={register}
							maxLength={255}
							value={taskName}
							classNameInput='!bg-neutral-1 text-neutral-8 pl-4'
							onChange={(e) => setTaskName(e.target.value)}
						/>
						<button
							className='absolute top-1 right-[40px] px-2 py-[8.1px] md:py-[10.1px] border-blue-15  hover:scale-110 bg-neutral-1 border-2 rounded-r-lg'
							title='Save'
						>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
								<path
									d='M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z'
									fill='#22c1c3'
								/>
							</svg>
						</button>
					</div>
				) : (
					<>
						{isClient && (
							<h2
								className='md:col-span-2 text-24 lg:text-32 text-gradient-red font-bold leading-1-4 text-left'
								onClick={() => setVisibleTaskName(true)}
							>
								{taskName}
							</h2>
						)}
					</>
				)}
			</>
		)
	}

	const RenderTimeTracking = () => {
		return (
			<>
				<div>
					<label htmlFor='' className='text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block'>
						Time Checking <span className='text-red-1'>*</span>
					</label>
					<Form.Item validateTrigger={['onChange']} className='m-0'>
						<Slider
							value={timeTracking.timeTrackingSpent}
							max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
						/>
						<div className='flex justify-between items-center'>
							<p>{timeTracking.timeTrackingSpent}h logged</p>
							<p>{timeTracking.timeTrackingRemaining}h remaining</p>
						</div>
					</Form.Item>
				</div>
				{isClient && (
					<div className='grid grid-cols-2 items-center gap-5'>
						<div className='col-span-2 '>
							<Input
								classNameLabel='text-neutral-8'
								nameLabel='Original Estimate'
								required
								name='originalEstimate'
								type='number'
								id='originalEstimate'
								className='relative group '
								errorMessage={errors.originalEstimate?.message}
								register={register}
								classNameInput='!bg-neutral-1 text-neutral-8'
								iconInput={<ClockCircleOutlined className='text-20 text-blue-15  ' />}
								min={0}
								onBlur={(e) => handleUpdateEstimate(Number(e.target.value))}
								defaultValue={dataTaskDetail?.originalEstimate ? dataTaskDetail?.originalEstimate : 0}
							/>
						</div>
						<Input
							classNameLabel='text-neutral-8'
							nameLabel='Time Spent'
							required
							name='timeTrackingSpent'
							type='number'
							id='timeTrackingSpent'
							className='relative group '
							errorMessage={errors.timeTrackingSpent?.message}
							register={register}
							classNameInput='!bg-neutral-1 text-neutral-8'
							onBlur={(e) =>
								handleTimeTracking({
									timeTrackingSpent: +e.target.value,
									timeTrackingRemaining: timeTracking.timeTrackingRemaining
								})
							}
							iconInput={<MinusCircleOutlined className='text-20 text-blue-15  ' />}
							min={0}
							defaultValue={timeTracking?.timeTrackingSpent && timeTracking?.timeTrackingSpent}
						/>
						<Input
							classNameLabel='text-neutral-8'
							nameLabel='Time Remaining'
							required
							name='timeTrackingRemaining'
							type='number'
							id='timeTrackingRemaining'
							className='relative group '
							errorMessage={errors.timeTrackingRemaining?.message}
							register={register}
							classNameInput='!bg-neutral-1 text-neutral-8'
							onBlur={(e) =>
								handleTimeTracking({
									timeTrackingSpent: timeTracking.timeTrackingSpent,
									timeTrackingRemaining: +e.target.value
								})
							}
							iconInput={<PlusCircleOutlined className='text-20 text-blue-15  ' />}
							min={0}
							defaultValue={dataTaskDetail?.timeTrackingRemaining && dataTaskDetail?.timeTrackingRemaining}
						/>
					</div>
				)}
			</>
		)
	}

	return (
		<>
			{dataTaskDetail && (
				<form className='shadow-primary bg-neutral-1 p-4 md:p-6 rounded-xl relative'>
					<RenderIconClose />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-start'>
						<RenderTaskName />
						<div className='grid grid-cols-1 gap-5'>
							{/* STATUS  */}
							<div>
								<label htmlFor='' className='text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block'>
									Status <span className='text-red-1'>*</span>
								</label>
								<SelectController
									name='statusId'
									control={control}
									options={dataStatusOption}
									errorMessage={errors.statusId?.message}
									placeholder='Choose a status task'
									iconSelect={<CheckCircleTwoTone className='text-20 text-blue-15  ' twoToneColor='#22c1c3' />}
									onChange={(e) => handleUpdateStatus(Number(e))}
									defaultValue={dataTaskDetail?.statusId}
								/>
							</div>

							{/* PRIORITY  */}
							<div>
								<label htmlFor='' className='text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block'>
									Priority <span className='text-red-1'>*</span>
								</label>
								<SelectController
									name='priorityId'
									control={control}
									options={dataPriorityOption}
									errorMessage={errors.priorityId?.message}
									placeholder='Choose a priority task'
									iconSelect={<HighlightOutlined className='text-20 text-blue-15  ' />}
									onChange={(e) => handleUpdatePriority(Number(e))}
									defaultValue={dataTaskDetail?.priorityId}
								/>
							</div>

							{/* TASK TYPE  */}
							<div>
								<label htmlFor='' className='text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block'>
									Task Type <span className='text-red-1'>*</span>
								</label>
								<SelectController
									name='typeId'
									control={control}
									options={dataTypeOption}
									errorMessage={errors.typeId?.message}
									placeholder='Choose a type task'
									iconSelect={<TagsOutlined className='text-20 text-blue-15  ' />}
									defaultValue={dataTaskDetail?.typeId}
								/>
							</div>

							{/* ASSIGN MEMBER TASK  */}
							<div>
								<label htmlFor='' className='text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block'>
									Assignees <span className='text-red-1'>*</span>
								</label>
								{isClient && (
									<Select
										defaultValue={selectedMembers}
										isMulti
										name='listUserAsign'
										options={dataAssignMemberOption}
										className='basic-multi-select '
										classNamePrefix='select'
										value={selectedMembers}
										onChange={handleMemberSelectChange}
									/>
								)}
							</div>

							{/* TIME TRACKING  */}
							<RenderTimeTracking />
						</div>
						<div className='grid grid-cols-1 gap-3 md:gap-5 row-start-2 md:col-start-2'>
							{/* DESCRIPTION  */}
							{dataTaskDetail?.description && (
								<div>
									<h3 className='text-16 text-gradient-blue leading-1-4 font-semibold'>* Desciption:</h3>
									{visibleDescription ? (
										<div className='relative'>
											<Editor
												value={descriptionTask}
												onTextChange={(e: any) => setDescriptionTask(e.htmlValue)}
												className='border-[2px] border-blue-15  rounded-[10px] overflow-hidden mt-1 '
												name='description'
												placeholder='You can write description your project'
											/>
											<button
												className='border-t-2 border-l-2 border-blue-15 p-1.5 rounded-tl-lg rounded-br-lg group bg-neutral-1 absolute right-0.5 bottom-0.5'
												title='Save'
												type='button'
												onClick={(e) => handleUpdateDescription(e)}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													className='group-hover:scale-110'
												>
													<path
														d='M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z'
														fill='#22c1c3'
													/>
												</svg>
											</button>
										</div>
									) : (
										<div
											className='pl-4'
											dangerouslySetInnerHTML={{
												__html: descriptionTask ? descriptionTask : ''
											}}
											onClick={() => setVisibleDescription(true)}
										></div>
									)}
								</div>
							)}

							{/* COMMENT  */}
							<div>
								<h3 className='text-16 text-gradient-blue leading-1-4 font-semibold'>* Comment:</h3>
								{responseCommentList?.data?.content?.length > 0 &&
									responseCommentList?.data?.content?.map((item: UserCommentTask, index: number) => {
										return (
											<div key={index} className='relative flex items-center gap-2'>
												<p title={item?.user?.name ? item?.user?.name : 'Name'}>
													<Avatar
														src={`${item?.user?.avatar}`}
														alt={item?.user?.name ? item?.user?.name : 'Name'}
														className='h-8 w-8'
													/>
												</p>
												{visibleComment && item?.id == commentId ? (
													<div className='relative'>
														<Editor
															value={editCommentUser}
															onTextChange={(e: any) => setEditCommentUser(e.htmlValue)}
															className='border-[2px] border-blue-15  rounded-[10px] overflow-hidden mt-1 '
															name='description'
															placeholder='You can write description your project'
														/>
														<button
															className='border-t-2 border-l-2 border-blue-15 p-1.5 rounded-tl-lg rounded-br-lg group bg-neutral-1 absolute right-0.5 bottom-0.5'
															title='Save'
															type='button'
															onClick={(e) => handleEditComment(e)}
														>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																width='24'
																height='24'
																viewBox='0 0 24 24'
																fill='none'
																className='group-hover:scale-110'
															>
																<path
																	d='M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z'
																	fill='#22c1c3'
																/>
															</svg>
														</button>
													</div>
												) : (
													<div className='flex items-center justify-between gap-2 flex-1'>
														<div
															className='flex-1'
															dangerouslySetInnerHTML={{ __html: item?.contentComment as string }}
														></div>
														<div className='flex items-start md:gap-2'>
															<p title='Edit comment'>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	width='24'
																	height='24'
																	viewBox='0 0 24 24'
																	fill='none'
																	onClick={() => {
																		setVisibleComment(true)
																		setCommentId(item.id)
																		setEditCommentUser(item.contentComment)
																	}}
																	className='cursor-pointer scale-75 md:scale-90'
																>
																	<path
																		fillRule='evenodd'
																		clipRule='evenodd'
																		d='M3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H20C20.4142 21.25 20.75 21.5858 20.75 22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22Z'
																		fill='#0030ff'
																	/>
																	<path
																		d='M11.5201 14.929L11.5201 14.9289L17.4368 9.01225C16.6315 8.6771 15.6777 8.12656 14.7757 7.22455C13.8736 6.32238 13.323 5.36846 12.9879 4.56312L7.07106 10.4799L7.07101 10.48C6.60932 10.9417 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.04356 16.8833C3.94194 17.1882 4.02128 17.5243 4.2485 17.7515C4.47573 17.9787 4.81182 18.0581 5.11667 17.9564L8.38334 16.8676C9.00281 16.6611 9.31256 16.5578 9.60398 16.4189C9.94775 16.2551 10.2727 16.0543 10.5729 15.8201C10.8275 15.6215 11.0584 15.3907 11.5201 14.929Z'
																		fill='#0030ff'
																	/>
																	<path
																		d='M19.0786 7.37044C20.3071 6.14188 20.3071 4.14999 19.0786 2.92142C17.85 1.69286 15.8581 1.69286 14.6296 2.92142L13.9199 3.63105C13.9296 3.6604 13.9397 3.69015 13.9502 3.72028C14.2103 4.47 14.701 5.45281 15.6243 6.37602C16.5475 7.29923 17.5303 7.78999 18.28 8.05009C18.31 8.0605 18.3396 8.07054 18.3688 8.08021L19.0786 7.37044Z'
																		fill='#0030ff'
																	/>
																</svg>
															</p>
															<p title='Delete comment'>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	width='18'
																	height='20'
																	viewBox='0 0 18 20'
																	fill='none'
																	onClick={() => handleDeleteComment(item.id)}
																	className='cursor-pointer scale-75 md:scale-90'
																>
																	<path
																		d='M0 4.52381C0 4.12932 0.32671 3.80952 0.729726 3.80952H5.51787C5.52437 2.9683 5.61554 1.81504 6.45037 1.01668C7.10737 0.388386 8.00808 0 8.99999 0C9.99191 0 10.8926 0.388385 11.5496 1.01668C12.3844 1.81504 12.4756 2.9683 12.4821 3.80952H17.2703C17.6733 3.80952 18 4.12932 18 4.52381C18 4.9183 17.6733 5.2381 17.2703 5.2381H0.729726C0.32671 5.2381 0 4.9183 0 4.52381Z'
																		fill='#ff0000'
																	/>
																	<path
																		fillRule='evenodd'
																		clipRule='evenodd'
																		d='M8.5956 20H9.4044C12.1871 20 13.5785 20 14.4831 19.1141C15.3878 18.2281 15.4803 16.7749 15.6654 13.8685L15.9321 9.6806C16.0326 8.10361 16.0828 7.31511 15.6289 6.81545C15.1751 6.31579 14.4087 6.31579 12.876 6.31579H5.12404C3.59127 6.31579 2.82488 6.31579 2.37105 6.81545C1.91722 7.31511 1.96744 8.10361 2.06788 9.6806L2.33459 13.8685C2.5197 16.7749 2.61225 18.2281 3.51689 19.1141C4.42153 20 5.81289 20 8.5956 20ZM7.24628 10.1885C7.20506 9.75463 6.83753 9.43809 6.42537 9.48148C6.01321 9.52486 5.71251 9.91174 5.75372 10.3456L6.25372 15.6087C6.29494 16.0426 6.66247 16.3591 7.07463 16.3157C7.48678 16.2724 7.78749 15.8855 7.74628 15.4516L7.24628 10.1885ZM11.5746 9.48148C11.9868 9.52486 12.2875 9.91174 12.2463 10.3456L11.7463 15.6087C11.7051 16.0426 11.3375 16.3591 10.9254 16.3157C10.5132 16.2724 10.2125 15.8855 10.2537 15.4516L10.7537 10.1885C10.7949 9.75463 11.1625 9.43809 11.5746 9.48148Z'
																		fill='#ff0000'
																	/>
																</svg>
															</p>
														</div>
													</div>
												)}
											</div>
										)
									})}
								{!visibleComment && (
									<div className='flex items-center gap-2 mt-2'>
										<Image
											src={'/icon-avatar-1.jfif'}
											alt='Avatar'
											title='Avatar'
											width={40}
											height={40}
											loading='lazy'
											className='scale-75 md:scale-100 '
										/>
										<div className='relative'>
											<Editor
												value={commentUser}
												onTextChange={(e: any) => setCommentUser(e.htmlValue)}
												className='border-[2px] border-blue-15  rounded-[10px] overflow-hidden mt-1 '
												placeholder='You can write comment task'
											/>
											<button
												className='border-t-2 border-l-2 border-blue-15 p-1.5 rounded-tl-lg rounded-br-lg group bg-neutral-1 absolute right-0.5 bottom-0.5'
												title='Save'
												type='button'
												onClick={(e) => handleSubmitComment(e)}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
													className='group-hover:scale-110'
												>
													<path
														d='M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z'
														fill='#22c1c3'
													/>
												</svg>
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</form>
			)}
		</>
	)
}
