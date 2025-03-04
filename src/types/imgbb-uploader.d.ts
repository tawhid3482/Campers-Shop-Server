declare module "imgbb-uploader" {
    interface ImageBBResponse {
      url: string;
      delete_url?: string;
    }
  
    interface ImageBBOptions {
      apiKey: string;
      imagePath: string;
    }
  
    function imgbbUploader(options: ImageBBOptions): Promise<ImageBBResponse>;
  
    export default imgbbUploader;
  }
  