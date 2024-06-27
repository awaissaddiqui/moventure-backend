// these are not some standard codes you can change it for your own use.

export default {
    '0000': 'UNKNOWN_ERROR: an unknown error has occurred',

    '1001': 'SYNTAX_ERROR: missing semicolon',
    '1002': 'SYNTAX_ERROR: unexpected token',
    '1003': 'SYNTAX_ERROR: unclosed parenthesis',

    '2001': 'LOGIC_ERROR: division by zero',
    '2002': 'LOGIC_ERROR: infinite loop',
    '2003': 'LOGIC_ERROR: incorrect conditional logic',

    '3001': 'NULL_REFERENCE_ERROR: accessing property of null',
    '3002': 'NULL_REFERENCE_ERROR: dereferencing null pointer',
    '3003': 'NULL_REFERENCE_ERROR: using null variable',

    '4001': 'FILE_I/O_ERROR: file not found',
    '4002': 'FILE_I/O_ERROR: permission denied',
    '4003': 'FILE_I/O_ERROR: disk full',

    '5001': 'NETWORK_ERROR: connection timeout',
    '5002': 'NETWORK_ERROR: DNS resolution failed',
    '5003': 'NETWORK_ERROR: unreachable host',

    '6001': 'MEMORY_ERROR: out of memory',
    '6002': 'MEMORY_ERROR: memory leak',
    '6003': 'MEMORY_ERROR: buffer overflow',

    '7001': 'CONFIG_ERROR: invalid configuration format',
    '7002': 'CONFIG_ERROR: missing required parameter',
    '7003': 'CONFIG_ERROR: conflicting settings',
    '7004': 'CONFIG_ERROR: config directory is missing',
    '7005': 'CONFIG_ERROR: config file(s) missing',
};