export default {
  shapes: [
    {
      "resourceId": "kaishi",
      "properties": {
        "overrideid": "",
        "name": " 开始",
      },
      "stencil": {
        "id": "StartNoneEvent"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "shenpi1",
        },
        {
          "resourceId": "shenpi2"
        },
      ],
    },
    {
      "resourceId": "jieshu",
      "properties": {
        "overrideid": "",
        "name": "结束",
      },
      "stencil": {
        "id": "EndNoneEvent"
      },
      "childShapes": [ ],
      "outgoing": [ ],
    },
    {
      "resourceId": "shenpi1",
      "properties": {
        "overrideid": "",
        "name": "审批1",
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "shenpi3"
        },
        {
          "resourceId": "shenpi4"
        }
      ],
    },
    {
      "resourceId": "shenpi2",
      "properties": {
        "overrideid": "",
        "name": "审批2",
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "shenpi3"
        },
        {
          "resourceId": "shenpi4"
        },
        {
          "resourceId": "shenpi5"
        },
        {
          "resourceId": "shenpi6"
        }
      ],
    },
    {
      "resourceId": "shenpi3",
      "properties": {
        "overrideid": "",
        "name": "审批3",
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "shenpi1",
        },
        {
          "resourceId": "jieshu"
        }
      ],
    },
    {
      "resourceId": "shenpi4",
      "properties": {
        "overrideid": "",
        "name": "审批4",
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "jieshu"
        }
      ],
    },
    {
      "resourceId": "shenpi5",
      "properties": {
        "overrideid": "",
        "name": "审批5",
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "jieshu"
        }
      ],
    },
    {
      "resourceId": "shenpi6",
      "properties": {
        "overrideid": "",
        "name": "审批6",
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [ ],
      "outgoing": [
        {
          "resourceId": "jieshu"
        }
      ],
    }
  ]
}
