import { useEffect, useMemo } from "react"
import { profileRequest, selectProfileState } from "../store/profile/reducer"
import { useDispatch, useSelector } from "react-redux"
import { isNil } from "lodash"

export interface ConfigState {
  curPropId?: string | null
  orgId?: string | null
  path: string | null
}

export const useCurrentGroup = () => {
  const dispatch = useDispatch()
  const { data: profileData } = useSelector(selectProfileState)

  useEffect(() => {
    dispatch(profileRequest())
  }, [dispatch])

  const config = useMemo((): ConfigState => {
    const orgId = profileData?.data.organizationId
    let path: string | null = null

    if (!isNil(orgId)) {
      path = `organizations/${orgId}`
    }

    return {
      orgId: orgId,
      path: path,
    }
  }, [profileData?.data])

  return { config }
}
