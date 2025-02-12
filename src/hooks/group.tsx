import { useMemo } from "react"
import { selectProfileState } from "../store/profile/reducer"
import { useSelector } from "react-redux"
import { isNil } from "lodash"

export const useCurrentGroup = () => {
  const { data: profileData } = useSelector(selectProfileState)

  const config = useMemo(() => {
    const orgId = profileData?.data.organizationId
    let path: string | null = null

    if (!isNil(orgId)) {
      path = `organizations/${orgId}/`
    }

    return {
      orgId: orgId,
      path: path,
    }
  }, [profileData?.data])

  return { config }
}
