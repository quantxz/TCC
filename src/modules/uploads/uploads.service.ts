import { Injectable } from '@nestjs/common';
import { FileDto } from './dto/file-dto';
import { createClient } from '@supabase/supabase-js'
import { env } from 'process';



@Injectable()
export class UploadsService {

    async upload(file: FileDto) {
        const supabase = createClient(process.env.SUPABASE_CONECTION_URL, process.env.SUPABASE_API_KEY, {
            auth: {
                persistSession: false
            }
        })

        await supabase.storage.from("tcc").upload(file.originalName, file.buffer)
    }

}
