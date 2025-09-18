import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { validateSEO, validateSchema, validateURL } from '@/utils/seoValidation';

interface SEOMonitorProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: any;
  showMonitor?: boolean;
}

const SEOMonitor = ({ 
  title, 
  description, 
  canonical, 
  schema,
  showMonitor = false 
}: SEOMonitorProps) => {
  const [seoHealth, setSeoHealth] = useState<any>({});

  useEffect(() => {
    if (!showMonitor) return;

    const titleValidation = validateSEO.title(title);
    const descriptionValidation = validateSEO.description(description);
    const canonicalValidation = canonical ? validateSEO.canonical(canonical) : null;
    const urlValidation = validateURL.structure(window.location.pathname);
    const schemaValidation = schema ? validateSchema.requiredProperties(schema, schema['@type']) : null;

    setSeoHealth({
      title: titleValidation,
      description: descriptionValidation,
      canonical: canonicalValidation,
      url: urlValidation,
      schema: schemaValidation,
      overall: titleValidation.isValid && descriptionValidation.isValid && 
                (canonicalValidation?.isValid !== false) && urlValidation.isValid
    });
  }, [title, description, canonical, schema, showMonitor]);

  if (!showMonitor || process.env.NODE_ENV === 'production') {
    return null;
  }

  const getIcon = (isValid: boolean | null) => {
    if (isValid === null) return <Info className="w-4 h-4 text-muted-foreground" />;
    return isValid ? 
      <CheckCircle className="w-4 h-4 text-green-600" /> : 
      <XCircle className="w-4 h-4 text-red-600" />;
  };

  const getBadgeVariant = (isValid: boolean | null) => {
    if (isValid === null) return 'secondary';
    return isValid ? 'default' : 'destructive';
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto z-50 shadow-lg border-2">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          {seoHealth.overall ? 
            <CheckCircle className="w-4 h-4 text-green-600" /> : 
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          }
          SEO Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span>Title ({seoHealth.title?.length})</span>
          <Badge variant={getBadgeVariant(seoHealth.title?.isValid)}>
            {seoHealth.title?.recommendation}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Description ({seoHealth.description?.length})</span>
          <Badge variant={getBadgeVariant(seoHealth.description?.isValid)}>
            {seoHealth.description?.recommendation}
          </Badge>
        </div>

        {seoHealth.canonical && (
          <div className="flex items-center justify-between">
            <span>Canonical URL</span>
            <Badge variant={getBadgeVariant(seoHealth.canonical?.isValid)}>
              {seoHealth.canonical?.isValid ? 'Valid' : 'Invalid'}
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>URL Structure</span>
          <Badge variant={getBadgeVariant(seoHealth.url?.isValid)}>
            {seoHealth.url?.isValid ? 'Valid' : 'Invalid'}
          </Badge>
        </div>

        {seoHealth.schema && (
          <div className="flex items-center justify-between">
            <span>Schema Markup</span>
            <Badge variant={getBadgeVariant(seoHealth.schema?.isValid)}>
              {seoHealth.schema?.isValid ? 'Complete' : 'Missing Fields'}
            </Badge>
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Overall SEO Health</span>
            <Badge variant={seoHealth.overall ? 'default' : 'destructive'}>
              {seoHealth.overall ? 'Healthy' : 'Needs Attention'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOMonitor;