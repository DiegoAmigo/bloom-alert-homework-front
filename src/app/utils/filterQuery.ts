interface Option {
    [key: string]: string | undefined;
}

export const filterQuery = (options: Option = {}) => {
        return Object.entries(options)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => {
            switch(key){
                case 'digestTimeStart': {
                    return `digest_start='${encodeURIComponent(value!)}'`
                }
                case 'digestTimeEnd': {
                    return `digest_end='${encodeURIComponent(value!)}'`
                }
                case 'timeStampStart': {
                    return `timestamp_start='${encodeURIComponent(value!)}'`
                }
                case 'timeStampEnd': {
                    return `timestamp_end='${encodeURIComponent(value!)}'`
                }
                case 'variable': {
                    return `variable='${encodeURIComponent(value!)}'`
                }
            }
        })
        .join('&');
}