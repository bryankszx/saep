// Códigos de status HTTP
const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

// Mensagens de sucesso
const MESSAGE_SUCCESS = {
    // Sucesso na requisição
    SUCESS_REQUEST: {
        status: true,
        status_code: STATUS_CODES.SUCCESS,
        message: 'Requisição realizada com sucesso.'
    },
    
    // Criado com sucesso
    SUCESS_CREATED_ITEM: {
        status: true,
        status_code: STATUS_CODES.CREATED,
        message: 'Item criado com sucesso.'
    },
    
    // Atualizado com sucesso
    SUCESS_UPDATE_ITEM: {
        status: true,
        status_code: STATUS_CODES.SUCCESS,
        message: 'Item atualizado com sucesso.'
    },
    
    // Deletado com sucesso
    SUCESS_DELETE_ITEM: {
        status: true,
        status_code: STATUS_CODES.NO_CONTENT,
        message: 'Item excluído com sucesso.'
    }
};

// Mensagens de erro
const MESSAGE_ERROR = {
    // Erro interno do servidor
    ERROR_INTERNAL_SERVER: {
        status: false,
        status_code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Erro interno no servidor. Por favor, tente novamente mais tarde.'
    },
    
    // Erro interno do servidor (controle)
    ERROR_INTERNAL_SERVER_CONTROLLER: {
        status: false,
        status_code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Erro interno no controlador. Por favor, tente novamente mais tarde.'
    },
    
    // Erro interno do servidor (modelo)
    ERROR_INTERNAL_SERVER_MODEL: {
        status: false,
        status_code: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Erro interno no modelo. Por favor, tente novamente mais tarde.'
    },
    
    // Campos obrigatórios não informados
    ERROR_REQUIRED_FIELDS: {
        status: false,
        status_code: STATUS_CODES.BAD_REQUEST,
        message: 'Campos obrigatórios não foram preenchidos corretamente.'
    },
    
    // Item não encontrado
    ERROR_NOT_FOUND: {
        status: false,
        status_code: STATUS_CODES.NOT_FOUND,
        message: 'Nenhum item encontrado com os critérios fornecidos.'
    },
    
    // Tipo de conteúdo inválido
    ERROR_CONTENT_TYPE: {
        status: false,
        status_code: STATUS_CODES.BAD_REQUEST,
        message: 'O cabeçalho Content-Type deve ser application/json.'
    },
    
    // Item já existe
    ERROR_ITEM_EXISTS: {
        status: false,
        status_code: STATUS_CODES.CONFLICT,
        message: 'Este item já está cadastrado no sistema.'
    },
    
    // Acesso não autorizado
    ERROR_UNAUTHORIZED: {
        status: false,
        status_code: STATUS_CODES.UNAUTHORIZED,
        message: 'Acesso não autorizado. Faça login para continuar.'
    }
};

// Exporta as mensagens
module.exports = {
    STATUS_CODES,
    MESSAGE_SUCCESS,
    MESSAGE_ERROR,
    ...MESSAGE_SUCCESS,
    ...MESSAGE_ERROR
};
