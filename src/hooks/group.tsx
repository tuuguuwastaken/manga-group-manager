import { isNil } from "lodash"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectProfileState } from "../store/profile/reducer"

export interface ConfigState {
  curPropId?: string | null
  orgId?: string | null
  path: string | null
}

export const useCurrentGroup = () => {
  const { data: profileData } = useSelector(selectProfileState)

  const config = useMemo((): ConfigState => {
    const orgId = profileData?.data.organizationId
    let path: string | null = null

    if (!isNil(orgId)) {
      path = `organizations/${orgId}`
      localStorage.setItem("org_id", orgId)
    }

    return {
      orgId: orgId,
      path: path,
    }
  }, [profileData?.data])

  return { config }
}
