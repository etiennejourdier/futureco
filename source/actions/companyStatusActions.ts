import { dropWhile } from 'ramda'
import { nextQuestionUrlSelector } from 'Selectors/companyStatusSelectors'

const thenGoToNextQuestion = actionCreator => (...args: unknown[]) => (
	dispatch,
	getState,
	{ history, sitePaths }
) => {
	dispatch(actionCreator(...args))
	history.push(nextQuestionUrlSelector(getState(), { sitePaths }))
}

export const isSoleProprietorship = thenGoToNextQuestion(
	(isSoleProprietorship?: boolean) =>
		({
			type: 'COMPANY_IS_SOLE_PROPRIETORSHIP',
			isSoleProprietorship
		} as const)
)

type DirectorStatus = 'SALARIED' | 'SELF_EMPLOYED'

export const defineDirectorStatus = thenGoToNextQuestion(
	(status: DirectorStatus) =>
		({
			type: 'DEFINE_DIRECTOR_STATUS',
			status
		} as const)
)

export const companyHasMultipleAssociates = thenGoToNextQuestion(
	(multipleAssociates?: boolean) =>
		({
			type: 'COMPANY_HAS_MULTIPLE_ASSOCIATES',
			multipleAssociates
		} as const)
)

export const isAutoentrepreneur = thenGoToNextQuestion(
	(autoEntrepreneur?: boolean) =>
		({
			type: 'COMPANY_IS_MICROENTERPRISE',
			autoEntrepreneur
		} as const)
)

export const directorIsInAMinority = thenGoToNextQuestion(
	(minorityDirector?: boolean) =>
		({
			type: 'SPECIFY_DIRECTORS_SHARE',
			minorityDirector
		} as const)
)

export const goToCompanyStatusChoice = () => (
	dispatch,
	_,
	{ history, sitePaths }
) => {
	dispatch({
		type: 'RESET_COMPANY_STATUS_CHOICE'
	} as const)
	history.push(sitePaths.créer.index)
}

export const resetCompanyStatusChoice = (from: string) => (
	dispatch,
	getState
) => {
	const answeredQuestion = Object.keys(
		getState().inFranceApp.companyLegalStatus
	)
	const answersToReset = dropWhile(a => a !== from, answeredQuestion)
	if (!answersToReset.length) {
		return
	}
	dispatch({
		type: 'RESET_COMPANY_STATUS_CHOICE',
		answersToReset
	})
}
