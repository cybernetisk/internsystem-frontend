import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

class InternService {
  getGroup(groupId) {
    return reqwest({
      url: api("intern/groups/" + groupId),
      type: "json",
    })
  }

  getGroupList(page = 1, limit = 50) {
    return reqwest({
      url: api("intern/groups"),
      type: "json",
      data: {
        page,
        limit,
      },
    })
  }

  getUsers(search) {
    return reqwest({
      url: api("core/users"),
      data: {
        search,
        limit: 20,
      },
      type: "json",
    })
  }

  getInterForUser(userId) {
    return reqwest({
      url: api("intern/interns"),
      type: "json",
      data: {
        user: userId,
      },
    })
  }

  getIntern(internId) {
    return reqwest({
      url: api("intern/interns/" + internId),
      type: "json",
    })
  }

  getInterns(page = 1, limit = 50, search = "") {
    return reqwest({
      url: api("intern/interns"),
      type: "json",
      data: {
        page,
        limit,
        search,
      },
    })
  }

  getAccessLevels() {
    return reqwest({
      url: api("intern/accesslevels"),
      type: "json",
    })
  }

  getRoles() {
    return reqwest({
      url: api("intern/roles"),
      type: "json",
    })
  }

  getRole(roleId) {
    return reqwest({
      url: api("intern/roles/" + roleId),
      type: "json",
    })
  }

  getInternsFromRole(roleId) {
    return reqwest({
      url: api("intern/interns"),
      type: "json",
      data: {
        roles: roleId,
      },
    })
  }

  getRolesInGroup(groupId) {
    return reqwest({
      url: api("intern/roles"),
      type: "json",
      data: {
        groups: groupId,
      },
    })
  }

  getInternsInGroup(groupId) {
    return reqwest({
      url: api("intern/internroles"),
      type: "json",
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        role__groups: groupId,
      },
    })
  }

  getInternRoleForIntern(internId) {
    return reqwest({
      url: api("intern/internroles"),
      type: "json",
      data: {
        intern: internId,
      },
    })
  }

  addRoleToIntern(username, roleId) {
    return reqwest({
      url: api("intern/internroles"),
      type: "json",
      method: "post",
      data: {
        username: username,
        role: roleId,
      },
    })
  }
  removeRoleFromIntern(internRoleId) {
    return reqwest({
      url: api(`intern/internroles/${internRoleId}`),
      method: "delete",
      type: "json",
    })
  }

  addCardToUser(userId, cardNumber) {
    return reqwest({
      url: api("core/cards"),
      type: "json",
      method: "post",
      data: {
        user: userId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        card_number: cardNumber,
      },
    })
  }
  getCardsForUser(userId) {
    return reqwest({
      url: api("core/cards"),
      type: "json",
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        user__id: userId,
      },
    })
  }
  addComment(internId, comments) {
    return reqwest({
      url: api(`intern/interns/${internId}`),
      data: {
        comments,
      },
      type: "json",
      method: "patch",
    })
  }
}

export default new InternService()
